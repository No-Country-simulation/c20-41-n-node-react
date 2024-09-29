import pool from '../config/config.js'
import bcrypt from 'bcrypt'

export const createUserModel = async (nro_documento, nombre, apellido, genero, fecha_nacimiento, email, password, rol, nacionalidad, tipo_documento, telefono) =>{
  try{
    const passwordHashed = await bcrypt.hash(password, 10)
    const query = await pool.query(`INSERT INTO usuarios (nro_documento, nombre, apellido, genero, fecha_nacimiento, email, password, rol, nacionalidad, tipo_documento, telefono, creadaEl, actualizadaEl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, TO_CHAR(NOW(), 'DD-MM-YYYY'), TO_CHAR(NOW(), 'DD-MM-YYYY'))RETURNING *`,
      [nro_documento, nombre, apellido, genero, fecha_nacimiento, email, passwordHashed, rol, nacionalidad, tipo_documento, telefono]
    )
    return query.rows[0]
  }catch(error){
    console.log(error)
  }
}

export const getUserByNroDocumento = async(nro_documento) => {
  try {
    const query = await pool.query('SELECT * FROM usuarios_view WHERE nro_documento= $1',
      [nro_documento]
    )
    return query.rows[0]
  } catch (error) {
    console.log(error)
  }
}

export const getUserByEmail = async(email) => {
  try {
    const query = await pool.query('SELECT * FROM usuarios_view WHERE email= $1',
      [email]
    )
    return query.rows[0]
  } catch (error) {
    console.log(error)
  }
}

