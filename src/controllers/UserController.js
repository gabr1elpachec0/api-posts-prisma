const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {

  // Create
  async createUser(req, res) {

    const { name, email } = req.body
    const findUserByEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (findUserByEmail) {
      return res.json('Usuário já existe, tente outro email!')
    }
    else {
      await prisma.user.create({
        data: {
          name,
          email
        }
      })
    }
    return res.json('Usuário cadastrado!')
    // res.redirect('/')
  },

  // Read
  async getUsers(req, res) {
    const user = await prisma.user.findMany()

    return res.json(user)
  },

  // Update
  async updateUser (req, res) {
    const { name, email } = req.body
    const { id } = req.params

    const findUserById = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    const findUserByEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    // Verifica e o usuário existe, pelo id
    if (!findUserById) {
      return res.json('Usuário não encontrado!')
    }
    // Verifica se o usuário existe pelo email
    if (findUserByEmail) {
      return res.json('Usuário já existe, tente outro email!')
    }
    else {
      await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email
        }
      })
    }
    
  return res.json('Usuário atualizado!')
  },

  // Delete
  async deleteUser (req, res) {
    const { id } = req.params

    const findUserById = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!findUserById) {
      return res.json('Usuário não encontrado!')
    }

    await prisma.user.delete({
      where: {
        id: Number(req.params.id)
      }
    })

  return res.json('Usuário deletado!')
  }
}