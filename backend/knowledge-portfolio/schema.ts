//TODO: Image should be cloudinaryimage when supported
import { createSchema, list } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image, 
  json,
  checkbox
} from '@keystone-next/fields';
// import { cloudinaryImage } from '@keystone-next/cloudinary';
import { document } from '@keystone-next/fields-document';

export const lists = createSchema({
  User: list({
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
      items: relationship({ ref: 'Item.author', many: true }),
      categories: relationship({ ref: 'Category.author', many: true }),
      options: json(),

      // role: relationship({
      //   ref: 'Role.assignedTo', 
      // })
    },
    access: true,
  }),
  Item: list({
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

  //TODO: Do we need roles or just logged and not logged is enough?
  // Role: list({
  //   fields: {
  //     name: text({ isRequired: true }),
  //     assignedTo: relationship({
  //       ref: 'User.role', //TODO: Add this to user (two way),
  //       many: true
  //     })
  //   }
  // })
});
