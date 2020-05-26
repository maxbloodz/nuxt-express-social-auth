'use strict'

const usersModel = (connection, Sequelize) => {
  const Users = connection.define(
    'users',
    {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )

  return Users
}

module.exports = usersModel
