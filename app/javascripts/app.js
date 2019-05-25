// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.

import Delta_artifacts from '../../build/contracts/Delta.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Delta = contract(Delta_artifacts);


// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.

// CUENTAS QUE OBTENDREMOS DE METAMASK
var accounts;
var account;
var ultimo_precio;
var n;
var alerta;
var sub_form;
var estado_oferta;

window.App = {
  start: function() {
    var self = this;

    document.getElementById("f_terminar").style.visibility="hidden";   //visible

    alerta = document.getElementById("alertp");
    sub_form = document.getElementById("sub_formulario");

    // Bootstrap the MetaCoin abstraction for Use.
    Delta.setProvider(web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");

        return;
      }
      accounts = accs;
      account = accounts[0];

      console.log(accounts);

      self.Datos_Subasta();
      self.Datos_participante();
    });

  },

  play: function() {
    var self = this;
    var precio = ultimo_precio;
    var email = ''+document.getElementById("fi_email").value;
    var monto = document.getElementById("fi_monto").value;
    console.log(email,monto,precio);
    setEstado("Ejecutando transacción... (espere por favor)");
    // document.getElementById("loader").style.visibility="visible";   //visible
    Delta.deployed().then(function(instance) {
      return instance.ofertar(email, {
        from: account,
        value: web3.toWei(monto, "ether"),
        gas: 150000
      });
    }).then(function() {
      setEstado("Transacción completada!");
      self.Datos_Subasta();
      self.Datos_participante();
    }).catch(function(e) {
      console.log(e);
      setEstado("Error enviando coin; revisa el log.");
    });
  },

  terminar_j: function() {
    var self = this;
    setEstado("Cerrando SmartContract... (espere por favor)");
    // document.getElementById("loader").style.visibility="visible";   //visible
    Delta.deployed().then(function(instance) {
      return instance.terminar_subasta(n, {
        from: account,
        value: web3.toWei(0, "ether"),
        gas: 150000
      });
    }).then(function() {
      //destruir
      document.getElementById("f_terminar").style.visibility="hidden";
      setEstado("SmartContract Cerrado!");
      self.Datos_Subasta();
      self.Datos_participante();
    }).catch(function(e) {
      console.log(e);
      setEstado("Error ejecutando funcion; revisa el log.");
    });
  },

  Datos_Subasta: function() {
    var self = this;
    Delta.deployed().then(function(instance){
      instance.datos_oferta({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {

        var formulario = document.getElementById("formulario");
        var data_contenido = document.getElementById("contenidop");

        if (!error) {
          try {
            alerta.parentNode.removeChild(alerta);
          } catch (e) {
          }
          //terminar.parentNode.removeChild(terminar);

          var oferta_producto = document.getElementById("f_producto")
          var oferta_precio = document.getElementById("f_precio")
          var oferta_wallet = document.getElementById("f_casa")
          var oferta_time = document.getElementById("f_time")

          oferta_producto.innerHTML = event.args.o_item.valueOf();
          oferta_precio.innerHTML = event.args.o_precio.valueOf()/1000000000000000000 + " ETH";
          oferta_wallet.innerHTML = event.args.o_dir.valueOf();

          estado_oferta = event.args.state.valueOf();
          var estado_jugador = document.getElementById("f_estado_jugador")
          let now= Date.now() / 1000 | 0;
          //estado_oferta = false;
          console.log(estado_oferta);
          if(estado_oferta){
            // ABIERTO
            console.log("Licitación Abierta");
            setEstado("Licitación Abierta");
            estado_jugador.innerHTML = "Participante Actual"
            n = event.args.fin.valueOf() - now;
            if(n<=0){
              document.getElementById("f_terminar").style.visibility="visible";
            }

          } else {
            // TERMINADO
            document.getElementById("f_terminar").style.visibility="hidden";
            console.log("Licitación Terminada");
            setEstado("Licitación Terminada");
            estado_jugador.innerHTML = "Participante - Nuevo Ganador del Proyecto"
            try {
              formulario.parentNode.removeChild(formulario);
            } catch (e) {}

          }
        } else {
          data_contenido.parentNode.removeChild(data_contenido);
          formulario.parentNode.removeChild(formulario);
          console.error(error);
        }
      });
    });
  },

  Datos_participante: function() {
    Delta.deployed().then(function(instance){
      instance.ultimo_ofertante({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        if (!error) {
          var ofertante_oferta = document.getElementById("f_oferta")
          var ofertante_email = document.getElementById("f_email")
          var ofertante_wallet = document.getElementById("f_wallet")

          ultimo_precio = event.args.my_monto.valueOf()/1000000000000000000;
          console.log("Ultimo precio:",ultimo_precio);

          ofertante_email.innerHTML = event.args.my_email.valueOf();
          ofertante_oferta.innerHTML = ultimo_precio+ " ETH";
          ofertante_wallet.innerHTML = event.args.my_dir.valueOf();

        } else {
          console.error(error);
        }
      });
    });
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }
  App.start();
});

window.setInterval(function(){
  var l = document.getElementById("f_time");
  try {
    l.innerHTML = secondsToString(n);
  } catch (e) {}
  if(n <= 0){
    n = 0;
    try {
      sub_form.parentNode.removeChild(sub_form);
    } catch (e) {
    }
  }else{
    n--;
  }
},1000);


function secondsToString(seconds){
  var numdays = Math.floor(seconds / 86400);
  var numhours = Math.floor((seconds % 86400) / 3600);
  var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var numseconds = ((seconds % 86400) % 3600) % 60;
  if (n == 0){
    return "Finalizado";
  }else if(numdays == 0 && numhours == 0 && numminutes == 0){
    return numseconds + " s";
  }else if(numdays == 0 && numhours == 0){
    return numminutes + " m " + numseconds + " s";
  }else if (numdays == 0) {
    return numhours + " h " + numminutes + " m " + numseconds + " s";
  }else{
    return numdays + " d " + numhours + " h " + numminutes + " m " + numseconds + " s";
  }
}

function setEstado(message) {
  var status = document.getElementById("f_status");
  status.innerHTML = message;
}
