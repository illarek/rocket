pragma solidity >=0.4.21 <0.6.0;
/*
contract Delta {

    // DATOS DEL ITEM
    uint precio_base;
    string  item;
    bool open;
    uint time_fin;
    address payable owner;

    // DATOS DEL JUGADOR
    string nombre;
    string email;
    address payable dir;
    uint precio_oferta;

    // MENSAJES
    event producto(string o_item, uint o_precio, address o_dir, uint fin, bool state);
    event ultimo_ofertante(address my_dir, string my_email, uint my_monto);

    constructor() public {
      owner = msg.sender; //dato temporal cuante del dueño del item
      dir = owner;
      precio_base = 10 * 100000000000000000;
      item = "ITEM";
      open = true;
      time_fin = 12312312321;

      nombre = "Sin Jugador";
      email = "No Registrado";
      precio_oferta = precio_base;

      emit producto(item, precio_oferta, owner, time_fin, open);
    }



    function ofertar (string memory _email,  uint _monto) public{
      if((_monto > precio_oferta) && open){
          // retorna dinero al anteriro jugador
          dir.transfer(address(this).balance);
          // actualiza nuevo datos
          dir = msg.sender;
          email = _email;
          precio_oferta = _monto;
          emit ultimo_ofertante(dir, email, precio_oferta);
      }
    }


    function terminar_subasta(uint _time) public{
        if(time_fin == _time){
            open = false;
            emit producto(item, precio_oferta, owner, time_fin, open);
        }
    }

}*/
