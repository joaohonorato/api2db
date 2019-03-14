const {etlonibuses} = require('../db/models');
const axios = require('axios')
const {CronJob} = require('cron');
const apiUrl = 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/obterTodasPosicoes';

module.exports.configure = function configure(config){
    this.config = config;
    this.run = run;
    return this;
}



run = () => {
    /* CronJob no segundo 0, uma vez por minuto*/
    const job = new CronJob ('0 * * * * *',() => {
         iniciar() 
    })
    job.start();
}

function iniciar(){    
    /* Filtrar etl finalizadas com sucesso e ordenar de forma que a mais atual fique no topo */
    etlonibuses.findAll({
        where:{
            finalizada:true
        },
        order: [['datahora','DESC']]
    })
    /* Definir se é carga inicial ou atualizacao do banco baseado na ultima etl feita com sucesso */
    .then(etlsucesso => {
        if(etlsucesso && etlsucesso[0].dataValues){
            let ultimaVez = etlsucesso[0].dataValues.datahora;
            buscarOnibus(ultimaVez);
        }else{
            buscarOnibus()
        }
    });
}

/* Busca e filtra os Onibus da Api Transportes Rio */
function buscarOnibus(time) {
    axios.get(apiUrl)
    .then(transportes => transportes.data)
    /* Transforma array em objetos */
    .then(dados => dados.DATA.filter(regraTransporteValido).map(data => {
           return { 
            "datahora": data[0],
            "ordem": data[1],
            "linha": data[2],
            "latitude": data[3],
            "longitude": data[4],
            "velocidade": data[5]
            }
    }))
    /* Filtra os onibus baseado na ultima etl feita com sucesso */
    .then((listaOnibusValidos) => {
        return (time) ? listaOnibusValidos.filter(bus => bus.datahora > time) : listaOnibusValidos
    })
    /* Inseri no banco de dados informacoes da etl e os onibus */
    .then((listaOnibusFiltrados) => {
        etlonibuses.create({
            "datahora": new Date(),
            "responsavel": "api2db-nodejs",
            "finalizada": true,
            "erro": ""
        }).then(etl => listaOnibusFiltrados.forEach(bus => etl.createOnibus(bus)))
    })    
    /* Inseri no banco as informacoes da etl */
    .catch(err=> {
        etlonibuses.create({
            "datahora": new Date(),
            "responsavel": "api2db-nodejs",
            "finalizada": false,
            "erro": err.message
        })
    });

    function regraTransporteValido(transporte){
        return transporte[5] > 60 && transporte[2] !== ""
    } 
}  

