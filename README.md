# Desplegando Dapp y Smart-Contracts sobre La BlockChain Ethereum

Los `Smart-Contracts` son aplicaciones que se ejecutan en la `máquina virtual Ethereum`. Que no es otra cosa que una `computadora mundial` descentralizada en la que `cada nodo de la Blockchain Ethereum` proporcionan su poder computacional para sostener la red (Blockchain).

Existen muchas maneras de poner tu `Smart-Contracts` sobre alguna de las redes disponibles al público de Ethereum; puedes descargar ethereum Wallet para desarrolladores y subirla por ese medio, usar remix ethereum, también puedes utilizar un Framework llamado truffle u otras formas, como configurar una api Web3 (para desarrolladores con buen dominio en estas herramientas).

### References

### Authors
       Francisco Rosales.
       John Barrera.

## Contextualizandonos  
### Herramientas
- `node`:
- `npm`:
- `metamask`:
- `truffle`:
- `geth ethereum`:
- `ganache-cli`:
- `git`:

### Estructura del Proyecto

    $ tree roulette
    roulette/
    ├── .git	: git
    ├── app	: Carpeta, donde toda la lógica del proyecto,llamamos a los Smart
    |      	  contracts y diseñamos las vistas.		
    ├── build	: Archivo para ejecutar en producción.
    ├── contracts	: Directorio de contratos de Solidity.
    ├── migrations	: Directorio de archivos de implementación de secuencias de comandos.
    ├── test	: Directorio de archivos de prueba para probar su aplicación y contratos.
    ├── node_modules	: Componentes de node
    ├── truffle.js	: Archivo de configuración de truffle.
    └── webpack.config.js	: Archivo de configuracion de instancias y plugins para nuestro proyecto.
    └── README.md	: Default README file.


### Arquitectura de una DApp
  ![Match function](https://user-images.githubusercontent.com/7105645/46321326-4d7cc400-c5a8-11e8-9091-0c16e5f6a9a0.png)

## Desplegando Nuestro Proyecto
### Requisitos
- Necesitas descargar el SO Ubuntu que la puedes descargar [aquí][Ubuntu] , usamos esta máquina para el tutorial, pero recuerda que puedes usar tu propia máquina y otro Sistema operativo, solo asegurate de instalar las herramienta necesarias.
- VMWare, puedes descargar desde los siguientes enlaces:
  - Para [Linux][Linux]  
  - Para [Windows][Windows]
  - Para [Mac][Mac]

### Preparación del Entorno de Trabajo

- Instala el SO en VMWare, no olvides tu usuario y contraseña que el sistemas lo solicitara para las instalaciones.
- Inicializa la terminal y actualiza las dependencias de ubuntu con los siguientes comandos:
  ```git
    $ sudo apt-get upgrade
    $ sudo apt-get update
  ```
- Instala node versión 8 o superior.
  ```git
    $ sudo apt-get install curl
    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install -y nodejs
  ```
- Instala truffle
  ```git
    $ sudo npm install -g truffle
  ```
- En tu navegador instalar [MetaMask][Metamask] (para poder ejecutar los Smart Contracts)
  ![Match function](https://user-images.githubusercontent.com/7105645/46318508-5f586a00-c59c-11e8-8889-4e2a71f16cd4.PNG)

- Instalar un nodo de Ethereum en tu computador, para poder llamarlo localmente.

  Existen 2 manera usando `ganache-cli`, para simular un nodo de ethereum, no tienes que descargar toda la blockchain existente porque creas una nueva en modo local, y usando `Geth` que te permite conectarte a cualquiera de las redes de ethereum (main, ropsten, rinkeby u otras que puedes crear).

  - **Forma 1:**

    En la máquina virtual usaremos `ganache-cli`, para ellos instalaremos el programa.
    ```git
      $ sudo npm install -g ganache-cli
    ```
  - **Forma 2:**

    En esta forma preferimos que descargue sobre tu máquina real (no la virtual), ya que descarga la blockchain de ethereum, en este ejemplo Ropsten.
    ```git
      $ sudo apt-get install software-properties-common
      $ sudo add-apt-repository -y ppa:ethereum/ethereum
      $ sudo apt-get update
      $ sudo apt-get install ethereum
    ```
    Iniciamos geth en la red Ropsten (no cerrar el terminal y que esto crea la conexión con la red ethereum).
    ```git
      $ geth --testnet --syncmode "light" --rpc --rpcapi db,eth,net,web3,personal --cache=1024
    ```
    En otro terminal accedemos al nodo una vez que este se haya sincronizado y descargado todos los datos.
    ```git
      $ geth attach http://127.0.0.1:8545
    ```
    Creación de una cuenta nuevas (Solo en la red que iniciaste):
    ```git
      > personal.newAccount()
    ```
    > **Nota**: Su nueva cuenta tiene que estas protegida. Por lo que necesitas crear una contraseña.
    ```git
     Passphrase:
     Repeat passphrase: 
     "0x05204abe320e1d45c229cecd395daf13a4f58f52"

    ```
    
    Concedemos permisos para truffle puede acceder a nuestra cuenta (realizamos esto cada vez que quieras desplegar un Smart Contract)
    ```git
      > personal.unlockAccount(eth.accounts[0])
      true
    ```

### Instalación del Proyecto

- Descargamos nuestro proyecto de github, recuerda que si modificaste el contrato necesitas correrlo de nuevo y comprobar que la versión del smart contract en solidity esté vigente (este es un problema, Solidity aún está en desarrollo y va cambiando constantemente).
  ```git
    $ git clone https://github.com/esc000658/roulette.git
  ```
  > **Nota**: Nuestro proyecto incluye una interfaz gráfica amigable, y fue desarrollada usan webpack y truffle.

### Despliegue del Proyecto
- Desplegamos nuestro proyecto de forma local.

  - Iniciamos `ganache-cli`, este nos mostrara 10 claves privada con 100 ethers, podemos copiar algunas de ellas para poder probar luego.
  ```git
    $ ganache-cli
  ```
  - En nuestro navegador abrimos metamask y seleccionamos localhost; luego importamos las clave privadas de las cuentas que añadiremos.
  - Accedemos por consola a la dirección de nuestro proyecto y ejecutamos estos comando, para compilar desplegar el Smart Contract.
    - Solo si Actualizaste o modificaste la versión del Smart Contract:
    ```git
      $ truffle compile
    ```
    - Si estás usando ganache-clie:
    ```git
      $ truffle migrate --network local --reset
    ```
    - Si Usamos geth podemos desplegar con este comando:
    ```git
      $ truffle migrate --network rospten --reset
    ```
  - Accedemos por consola a la dirección de nuestro proyecto y ejecutamos estos comando, para compilar desplegar el Smart Contract.
  ```git
    $ npm run dev
  ```
  Y si estas en un servidor web:
  ```git
    $ npm run build
  ```
## Listo, ahora ya podemos jugar!

  ![Match function](https://user-images.githubusercontent.com/7105645/46320643-fcb79c00-c5a4-11e8-9717-be1b516593ba.png)


  ![Match function](https://user-images.githubusercontent.com/7105645/46320654-06410400-c5a5-11e8-8734-eb87cc2fd9b7.png)


## Conclusion  

## keyword
	Dapp, Smart Contract, Ethereum, Blockchain, truffle, geth

[Linux]:https://www.vmware.com/products/workstation-for-linux.html
[Windows]:https://www.vmware.com/products/workstation.html
[Mac]:https://www.vmware.com/products/fusion.html
[Ubuntu]:https://www.ubuntu.com/download/desktop
[Metamask]:https://metamask.io/#how-it-works
