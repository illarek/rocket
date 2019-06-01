//pragma solidity >=0.4.21 <0.6.0;
pragma solidity ^0.4.24;


contract Delta {

    // DATOS DEL ITEM
    uint precio_base;
    string  item;
    bool open;
    uint time_fin;
    address  owner;

    // DATOS DEL JUGADOR
    string nombre;
    string email;
    address  dir;
    uint precio_oferta;

    // MENSAJES
    event datos_oferta(string o_item, uint o_precio, address o_dir, uint fin, bool state);
    event ultimo_ofertante(address my_dir, string my_email, uint my_monto);

    constructor() public {
      owner = msg.sender; //dato temporal cuante del dueño del item
      dir = owner;
      precio_base = 10 * 1000000000000000000;
      item = "PROYECTO_0X001";
      open = true;
      time_fin = now + (60*60*24*7); //86400;

      nombre = "Sin Participantes";
      email = "No Registrado";
      precio_oferta = precio_base+1;
      //precio_oferta = 0;

      emit datos_oferta(item, precio_base, owner, time_fin, open);
      //emit ultimo_ofertante(dir, "email aun no registrado", precio_oferta);
      emit ultimo_ofertante(dir, "email aun no registrado", 0);
    }

    function ofertar (string memory _email) public payable{
      if((msg.value < precio_oferta) && (msg.value  <= precio_base) && open){
          // retorna dinero al anteriro jugador
          dir.transfer(address(this).balance-msg.value);
          // actualiza nuevo datos
          dir = msg.sender;
          email = _email;
          precio_oferta = msg.value;
          emit ultimo_ofertante(dir, email, precio_oferta);
      }else{
        revert();
      }
    }

    function terminar_subasta(uint time) public payable{
        if(time <= 0){
            open = false;
            owner.transfer(address(this).balance-msg.value);
            emit datos_oferta(item, precio_base, owner, time_fin, open);
            emit ultimo_ofertante(dir, email, precio_oferta);
        }
    }
}
