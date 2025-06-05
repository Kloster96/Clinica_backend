const Persona = require('./../mock/entities/paciente.entity.js');

class PacientesModel {
  constructor() {
    this.data = [];
    this.data.push(new Persona("123456787","Sergio","Antozzi","email@gmail.com",1));
    this.id = 2;
  }
  // crea un dato nuevo (alta de cliente)
  create(paciente) {
    //TODO: verificar que no sea nulo si es nulo tierar excepcion

    //return persona;
    return new Promise((resolve, reject) => {
      paciente.id = this.id;
      this.id++;
      this.data.push(paciente);
    
      resolve(paciente);
      
    });
  }
  // actualiza los datos del cliente con id = id
  update(id, paciente) {
    try {
      const pacienteEncontrado = this.data.find((p)=>p.id==id);
      if(paciente===null){
        throw new Error("No se encuntra el paciente")
      }
     pacienteEncontrado.dni = paciente.dni 
     pacienteEncontrado.email = paciente.email;
     pacienteEncontrado.nombre = paciente.nombre;
     pacienteEncontrado.apellido = paciente.apellido
    } catch (error) {
      console.log(error.message());
    }
  
  }
  // elimina el cliente con id = id
  delete(id) {
    return new Promise((resolve, reject) => {
      const largoInicial = this.data.length;
      this.data = this.data.filter((p) => p.id !== id);
      if (this.data.length < largoInicial) {
        resolve(true);
      }else{
        reject(new Error(`Paciente con ID ${id} no encontrado.`));
      }
    });
    
  }
  // devuelve la lista completa en un arreglo de strings
  list() {
    return new Promise(
        (resolve,reject)=>{
            resolve(this.data);
        }
    );
  }

  findById(id) {
    return new Promise((resolve,reject) => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
      return reject(new Error("El ID proporcionado no es un número válido."));
      }
      const pacienteEncontrado = this.data.find(p => p.id === numericId);
      if (pacienteEncontrado) {
        resolve(pacienteEncontrado);
      } else {
        reject(new Error(`Paciente con ID ${numericId} no encontrado.`));
      }
    });
  }
}

module.exports = new PacientesModel();
