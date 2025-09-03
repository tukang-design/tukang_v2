export default {
  name: 'service',
  title: 'Service',
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
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        { name: 'MY', title: 'Malaysia (MY)', type: 'number' },
        { name: 'SG', title: 'Singapore (SG)', type: 'number' },
        { name: 'INT', title: 'International (INT)', type: 'number' }
      ]
    }
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
