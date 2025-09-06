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
      name: 'selectedGoals',
      title: 'Selected Project Goals',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Goal ID',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Goal Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Goal Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'selectedFeatures',
      title: 'Selected Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Feature ID',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Feature Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            },
            {
              name: 'price',
              title: 'Feature Price',
              type: 'number',
            },
            {
              name: 'complexity',
              title: 'Complexity Level',
              type: 'string',
              options: {
                list: [
                  {title: 'Basic', value: 'basic'},
                  {title: 'Intermediate', value: 'intermediate'},
                  {title: 'Advanced', value: 'advanced'},
                ],
              },
            },
            {
              name: 'required',
              title: 'Required Feature',
              type: 'boolean',
            },
          ],
        },
      ],
    },
    {
      name: 'totalPrice',
      title: 'Total Estimated Price',
      type: 'number',
    },
    {
      name: 'timeline',
      title: 'Project Timeline',
      type: 'string',
    },
    {
      name: 'projectBrief',
      title: 'Project Brief',
      type: 'text',
    },
    {
      name: 'region',
      title: 'Client Region',
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
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Quote Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In Review', value: 'reviewing'},
          {title: 'Quote Sent', value: 'quote_sent'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'Declined', value: 'declined'},
          {title: 'Expired', value: 'expired'},
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'status',
    },
    prepare(selection) {
      const {title, subtitle, description} = selection;
      return {
        title: title || 'Unnamed Quote',
        subtitle: subtitle || 'No email',
        description: description || 'New',
      };
    },
  },
};
