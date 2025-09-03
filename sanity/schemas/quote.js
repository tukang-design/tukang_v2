export default {
  name: 'quote',
  title: 'Project Quote',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'selectedService',
      title: 'Main Service Package',
      type: 'object',
      fields: [
        {
          name: 'id',
          title: 'Service ID',
          type: 'string',
        },
        {
          name: 'name',
          title: 'Service Name',
          type: 'string',
        },
        {
          name: 'basePrice',
          title: 'Base Price',
          type: 'number',
        },
      ],
    },
    {
      name: 'services',
      title: 'Selected Add-on Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Service Name',
              type: 'string',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
            },
            {
              name: 'id',
              title: 'Service ID',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'projectConfiguration',
      title: 'Project Configuration',
      type: 'object',
      fields: [
        {
          name: 'domain',
          title: 'Domain Choice',
          type: 'string',
          options: {
            list: [
              {title: 'New Domain', value: 'new'},
              {title: 'Existing Domain', value: 'existing'},
              {title: 'Not Specified', value: 'not-specified'},
            ],
          },
        },
        {
          name: 'paymentPlan',
          title: 'Payment Plan',
          type: 'string',
          options: {
            list: [
              {title: 'Full Payment', value: 'full'},
              {title: 'Installments', value: 'installments'},
              {title: 'Not Specified', value: 'not-specified'},
            ],
          },
        },
      ],
    },
    {
      name: 'timeline',
      title: 'Project Timeline',
      type: 'string',
    },
    {
      name: 'projectBrief',
      title: 'Project Brief',
      type: 'object',
      fields: [
        {
          name: 'businessName',
          title: 'Business Name',
          type: 'string',
        },
        {
          name: 'businessDescription',
          title: 'Business Description',
          type: 'text',
        },
        {
          name: 'mainGoal',
          title: 'Main Goal',
          type: 'string',
        },
      ],
    },
    {
      name: 'estimatedPrice',
      title: 'Estimated Price',
      type: 'number',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          {title: 'Malaysia', value: 'MY'},
          {title: 'Singapore', value: 'SG'},
          {title: 'International', value: 'INT'},
        ],
      },
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New Quote', value: 'new'},
          {title: 'Under Review', value: 'review'},
          {title: 'Quoted', value: 'quoted'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'Declined', value: 'declined'},
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'company',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `${title} - Project Quote`,
        subtitle: subtitle,
      }
    },
  },
}
