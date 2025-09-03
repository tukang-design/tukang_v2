export default {
  name: 'booking',
  title: 'Booking Submission',
  type: 'document',
  fields: [
    {
      name: 'submissionId',
      title: 'Submission ID',
      type: 'string',
      description: 'Unique identifier for this booking submission',
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'When the booking was submitted',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In Review', value: 'reviewing'},
          {title: 'Proposal Sent', value: 'proposal_sent'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'service',
      title: 'Selected Service',
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
          title: 'Base Price (MYR)',
          type: 'number',
        },
      ],
    },
    {
      name: 'addOns',
      title: 'Selected Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Add-on ID',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Add-on Name',
              type: 'string',
            },
            {
              name: 'basePrice',
              title: 'Base Price (MYR)',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'timeline',
          title: 'Timeline',
          type: 'string',
        },
        {
          name: 'budget',
          title: 'Budget',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Project Description',
          type: 'text',
        },
        {
          name: 'features',
          title: 'Additional Features',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
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
      ],
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
      name: 'estimatedPrice',
      title: 'Estimated Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
        },
        {
          name: 'originalAmount',
          title: 'Original Amount (MYR)',
          type: 'number',
        },
      ],
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Bahasa Melayu', value: 'ms'},
        ],
      },
    },
    {
      name: 'scheduledCall',
      title: 'Scheduled Discovery Call',
      type: 'boolean',
      description: 'Whether the client scheduled a discovery call or chose email follow-up',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for team members',
    },
    {
      name: 'followUpDate',
      title: 'Follow-up Date',
      type: 'datetime',
      description: 'When to follow up with this client',
    },
  ],
  preview: {
    select: {
      title: 'contactInfo.name',
      subtitle: 'service.name',
      media: 'status',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Unknown Contact',
        subtitle: `${subtitle || 'Unknown Service'} - Status: ${media || 'new'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date (Newest First)',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
}
