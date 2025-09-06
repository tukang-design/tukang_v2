export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(40),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {name: 'MY', title: 'Malaysia (MYR)', type: 'number'},
        {name: 'USD', title: 'International (USD)', type: 'number'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      const {title, description} = selection
      return {
        title,
        subtitle: description,
      }
    },
  },
}
