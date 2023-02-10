const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
  // Create
  async createPost(req, res) {
    const { content } = req.body
    const { id } = req.params

    const findUserById = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!findUserById) {
      return res.json('Usuário não existe!')
    }
    else {
      const post = await prisma.post.create({
        data: {
          content,
          userId: findUserById.id
        },
        include: {
          author: true
        }
      })
    }
    return res.json('Post criado!')
  },
  
  // Get 
  async getPosts(req, res) {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        author: true
      }
    })

    return res.json(posts)
  },

  // Update
  async updatePost(req, res) {
    const { id } = req.params
    const { content } = req.body

    const findPostById = await prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    }) 
    
    if (!findPostById) {
      return res.json('Post não encontrado!')
    }
    else {
      await prisma.post.update({
        where: {
          id: Number(id)
        },
        data: {
          content
        }
      })
    }
    return res.json('Post atualizado!')
  },

  // Delete
  async deletePost(req, res) {
    const { id } = req.params

    const findPostById = await prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    }) 

    if (!findPostById) {
      return res.json('Post não encontrado!')
    }
    
    else {
      await prisma.post.delete({
        where: {
          id: Number(id)
        }
      })
    }
    return res.json('Post deletado!')
  }
}