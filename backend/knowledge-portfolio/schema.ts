import { createSchema, list } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image 
} from '@keystone-next/fields';
// import { cloudinaryImage } from '@keystone-next/cloudinary';
import { document } from '@keystone-next/fields-document';

export const lists = createSchema({
  User: list({
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
      items: relationship({ ref: 'Item.author', many: true }),
    },
  }),
  Item: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Finished', value: 'finished' },
          { label: 'Unfinished', value: 'unfinished' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      //TODO: Restrict this? Maybe just a textarea.
      // content: document({
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
      description: text({
        ui: {
          displayMode: 'textarea'
        }
      }),
      // publishDate: timestamp(),
      author: relationship({
        ref: 'User.items',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      // image: relationship({
      //   ref: 'Image.item',
      //   ui: {
      //     displayMode: 'cards',
      //     cardFields: ['image'],
      //     inlineCreate: { fields: ['image']},
      //     inlineEdit: {fields: ['image']}
      //   }
      // }),
      categories: relationship({
        ref: 'Category.items',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
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
      isHidden: true,
    },
    fields: {
      name: text(),
      items: relationship({
        ref: 'Item.categories',
        many: true,
      }),
    },
  }),
});
