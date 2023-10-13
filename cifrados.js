
if (!window.sessionStorage.getItem('Usuarios')) {
    window.sessionStorage.setItem('Usuarios', btoa(JSON.stringify([
        { Usuario: "Maritza", Contrasena: "U2FsdGVkX1+wUMD2mIqeqYbqIDdaom84F0OfpiVFUBA=" },
        { Usuario: "Sebas", Contrasena: "U2FsdGVkX1+wUMD2mIqeqYbqIDdaom84F0OfpiVFUBA=" }
    ])));
}

if (!window.sessionStorage.getItem('Acceso')) {
    window.sessionStorage.setItem('Acceso', false);
}

function cifrarMensaje() {
    const mensaje = document.getElementById("mensaje").value;
    const clave = "MiClaveSecreta"; // Cambia esta clave por una que elijas
    const mensajeCifrado = CryptoJS.AES.encrypt(mensaje, clave).toString();
    document.getElementById("mensajeCifrado").textContent = mensajeCifrado;
}

function descifrarMensaje() {
    const mensajeCifrado = document.getElementById("mensajeCifrado").textContent;
    const clave = "MiClaveSecreta"; // Debes usar la misma clave que usaste para cifrar
    const bytes = CryptoJS.AES.decrypt(mensajeCifrado, clave);
    const mensajeDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("mensajeDescifrado").textContent = mensajeDescifrado;
}

function descifrarContrasena(contrasenaEnviada, contrasenaAdmin, ClaveSecreta) {
    const clave = ClaveSecreta; // Debes usar la misma clave que usaste para cifrar
    const bytes = CryptoJS.AES.decrypt(contrasenaAdmin, clave);
    const contrasenaDecifrada = bytes.toString(CryptoJS.enc.Utf8);

    if (contrasenaEnviada === contrasenaDecifrada) {
        return true;
    } else {
        return false;
    }

}

function verificarDatosLogin() {
    let usuario = document.getElementById('txtUsuarioIndex').value;
    let password = document.getElementById('txtUsuarioContrasena').value;
    let datosUsuarios = JSON.parse(atob(window.sessionStorage.getItem('Usuarios')));
    let accesoUsuario = false;

    datosUsuarios.forEach(data => {
        if (data.Usuario === usuario) {

            const claveSecreta = prompt("Ingresa la clave secreta: ");
            let validacionContrasena = descifrarContrasena(password, data.Contrasena, claveSecreta);
            if (validacionContrasena) {
                accesoUsuario = true;
                return;
            }
        }
    });
    if (!accesoUsuario) {
        Swal.fire({ icon: 'error', title: 'Acceso no concedido...', toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
    } else {
        Swal.fire({ icon: 'success', title: 'Acceso concedido...', toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        window.sessionStorage.setItem('Acceso', true);
        setTimeout(() => { window.location.href = 'https://maritzau28.github.io/practica-esteganografia/cifrado.html' }, 3200)
    }
}


var imgdatauri;

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.querySelector("#image1").src = e.target.result;
      imgdatauri = e.target.result;
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function decode(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
          const datoEnImagen = steg.decode(e.target.result)
          console.log('dato en imagen decifrado' + datoEnImagen)
          const claveSecreta = prompt("Ingresa la clave secreta: ");
          const bytes = CryptoJS.AES.decrypt(datoEnImagen, claveSecreta)

          document.querySelector('#decoded').innerText = bytes.toString(CryptoJS.enc.Utf8);
      };
    }
    reader.readAsDataURL(input.files[0]);
  }

  function cifrarMensaje() {
    const mensaje = document.getElementById("mensaje").value;
    const clave = "MiClaveSecreta"; // Cambia esta clave por una que elijas
    const mensajeCifrado = CryptoJS.AES.encrypt(mensaje, clave).toString();
    document.getElementById("mensajeCifrado").textContent = mensajeCifrado;
}


function hideText() {

  const mensajeACifrar = document.querySelector('#text').value;
  const claveSecreta = prompt("Ingresa la clave secreta: ");
  const mensajeOcultoCifrado = CryptoJS.AES.encrypt(mensajeACifrar, claveSecreta).toString();
  document.querySelector("#image2").src = steg.encode(mensajeOcultoCifrado, imgdatauri);
}

function descargarImagen() {
    const imagen = document.getElementById('image2');
  
    const enlaceTemporal = document.createElement('a');
    enlaceTemporal.href = imagen.src;
    enlaceTemporal.download = 'imagenCifrada.png'; 
  
    enlaceTemporal.click();
  }