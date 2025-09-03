export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(40)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description'
    },
    prepare(selection) {
      const { title, description } = selection
      return {
        title,
        subtitle: description
      }
    }
  }
}
