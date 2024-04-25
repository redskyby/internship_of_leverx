'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'user_roles',
        [
          { roleId: 1, userId: 1  },
          { roleId: 1, userId: 2  },
          { roleId: 2, userId: 3  },
          { roleId: 3, userId: 4  },
          { roleId: 2, userId: 5  },
          { roleId: 1, userId: 6  },
          { roleId: 3, userId: 7  },
          { roleId: 2, userId: 8  },
          { roleId: 3, userId: 9  },
          { roleId: 1, userId: 10  },
        ],
        {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
