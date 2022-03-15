//TODO: Image should be cloudinaryimage when supported
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image, 
  json,
  checkbox
} from '@keystone-6/core/fields';
// import { cloudinaryImage } from '@keystone-6/cloudinary';
import { document } from '@keystone-6/fields-document';
import { permissionFields } from './fields';

/******* USER VALIDATION *******/
// Validate there is a user with a valid session
const isUser = ({ session }: { session: Session }) =>
  !!session?.data.id;

// Validate the current user is an Admin
const isAdmin = ({ session }: { session: Session }) =>
  session?.data.isAdmin;
  /************************************************/

export const lists = {
  User: list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true}, isIndexed: 'unique' }),
      publicEmail: checkbox({ defaultValue: true }),
      password: password({validation: { isRequired: true } }),
      specialization: text(),
      items: relationship({ ref: 'Item.author', many: true }),
      sent: relationship({ ref: 'Message.sender', many: true}),
      received: relationship({ ref: 'Message.receiver', many: true}),
      categories: relationship({ ref: 'Category.author', many: true }),
      options: json(),
      following: relationship({ ref: 'User', many: true }),
      followers: relationship({ ref: 'User', many: true }),
      public: checkbox({ defaultValue: true }),
      linkedin: text(),
      instagram: text(),
      youtube: text(),
      website: text()
      // role: relationship({ ref: 'Role.assignedTo' })

      // role: relationship({
      //   ref: 'Role.assignedTo', 
      // })
    },
    // access: true,
  }),
  Item: list({
    access: {
      operation: {
        create: isUser,
        update: isUser,
        delete: isUser,
      },
    },
    fields: {
      title: text(),
      status: text(), 
      //TODO: Date can be text or must be a timestamp? If it can be sorted being just text...
      date: text(),
      visibility: text(),
      description: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      // singlePage: checkbox({
      //   defaultValue: false,
      //   isRequired: true,
      // }),
      //This is true or false but a string
      // singlePage: text(),
      // singlePageContent: document({
      //   formatting: true,
      //   layouts: [
      //     [1, 1],
      //     [1, 1, 1],
      //     [2, 1],
      //     [1, 2],
      //     [1, 2, 1],
      //   ],
      //   links: true,
      //   dividers: true,
      // }),
      singlePageContent: json(),
      image: text(),
      // publishDate: timestamp(),
      author: relationship({
        ref: 'User.items',
        many: false,
        // ui: {
        //   displayMode: 'cards',
        //   cardFields: ['name', 'email'],
        //   inlineEdit: { fields: ['name', 'email'] },
        //   linkToItem: true,
        //   inlineCreate: { fields: ['name', 'email'] },
        // },
      }),
      categories: relationship({
        ref: 'Category.items',
        many: true,
        // ui: {
        //   displayMode: 'cards',
        //   cardFields: ['name'],
        //   inlineEdit: { fields: ['name'] },
        //   linkToItem: true,
        //   inlineConnect: true,
        //   inlineCreate: { fields: ['name'] },
        // },
      }),
      urlTitle: text(),
      url: text()
    },
  }),


  // Image: list({
  //   fields: {
  //     //TODO: Enable when Cloudinary Image for KS6 is released
  //     // fieldName: cloudinaryImage({
  //     //   cloudinary: {
  //     //     cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  //     //     apiKey: process.env.CLOUDINARY_API_KEY,
  //     //     apiSecret: process.env.CLOUDINARY_API_SECRET,
  //     //     folder: 'knowledgeportfolio',
  //     //   },
  //     // })
     
  //     image: image({
  //       isRequired: false,
  //     }),
  //     item: relationship({
  //       ref: 'Item.image'
  //     }),
  //     /* ... */
      
  //   }
  // }),
  Category: list({
    access: {
      operation: {
        create: isUser,
        update: isUser,
        delete: isUser,
      },
    },
    ui: {
      isHidden: false,
    },
    fields: {
      name: text(),
      items: relationship({
        ref: 'Item.categories',
        many: true,
      }),
      author: relationship({
        ref: 'User.categories',
        many: false
        // ui: {
        //   displayMode: 'cards',
        //   cardFields: ['name', 'email'],
        //   inlineEdit: { fields: ['name', 'email'] },
        //   linkToItem: true,
        //   inlineCreate: { fields: ['name', 'email'] },
        // },
      }),
      icon: text()
    },
  }),

  Message: list({
    access: {
      operation: {
        create: isUser,
        update: isUser,
        delete: isUser,
      },
    },
    fields: {
      text: text(),
      sender: relationship({
        ref: 'User.sent',
        many: false
      }),
      receiver: relationship({
        ref: 'User.received',
        many: false
      })
    }
  }),

  // Role: list({
  //   fields: {
  //     name: text({validation: { isRequired: true } }),
  //     ...permissionFields,
  //     assignedTo: relationship({
  //       ref: 'User.role', //TODO: Add this to user (two way),
  //       many: true
  //     })
  //   }
  // })
};
