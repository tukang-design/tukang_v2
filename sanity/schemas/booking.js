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
      name: 'bookingType',
      title: 'Booking Type',
      type: 'string',
      options: {
        list: [
          {title: 'Goal-Based', value: 'goal-based'},
          {title: 'Service-Based (Legacy)', value: 'service-based'},
        ],
      },
      description: 'Type of booking structure used',
    },
    // Goal-based booking fields
    {
      name: 'websiteType',
      title: 'Website Type',
      type: 'string',
      description: 'Determined website type based on selected goals',
      hidden: ({document}) => document?.bookingType !== 'goal-based',
    },
    {
      name: 'selectedGoals',
      title: 'Selected Goals',
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
            {
              name: 'price',
              title: 'Goal Price',
              type: 'number',
            },
          ],
        },
      ],
      hidden: ({document}) => document?.bookingType !== 'goal-based',
    },
    {
      name: 'selectedFeatures',
      title: 'Selected Additional Features',
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
              name: 'title',
              title: 'Feature Title',
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
          ],
        },
      ],
      hidden: ({document}) => document?.bookingType !== 'goal-based',
    },
    {
      name: 'projectBrief',
      title: 'Project Brief',
      type: 'object',
      fields: [
        {
          name: 'businessDescription',
          title: 'Business Description',
          type: 'text',
        },
        {
          name: 'targetAudience',
          title: 'Target Audience',
          type: 'text',
        },
        {
          name: 'keyGoals',
          title: 'Key Goals',
          type: 'text',
        },
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
          name: 'inspiration',
          title: 'Inspiration/Examples',
          type: 'text',
        },
        {
          name: 'additionalRequirements',
          title: 'Additional Requirements',
          type: 'text',
        },
      ],
      hidden: ({document}) => document?.bookingType !== 'goal-based',
    },
    {
      name: 'pricing',
      title: 'Goal-Based Pricing',
      type: 'object',
      fields: [
        {
          name: 'totalAmount',
          title: 'Total Amount',
          type: 'number',
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
        },
        {
          name: 'region',
          title: 'Pricing Region',
          type: 'string',
        },
      ],
      hidden: ({document}) => document?.bookingType !== 'goal-based',
    },
    // Legacy service-based booking fields
    {
      name: 'service',
      title: 'Selected Service (Legacy)',
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
      hidden: ({document}) => document?.bookingType !== 'service-based',
    },
    {
      name: 'addOns',
      title: 'Selected Add-ons (Legacy)',
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
      hidden: ({document}) => document?.bookingType !== 'service-based',
    },
    {
      name: 'projectDetails',
      title: 'Project Details (Legacy)',
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
      hidden: ({document}) => document?.bookingType !== 'service-based',
    },
    {
      name: 'estimatedPrice',
      title: 'Estimated Price (Legacy)',
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
      hidden: ({document}) => document?.bookingType !== 'service-based',
    },
    // Common fields for both booking types
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
      websiteType: 'websiteType',
      bookingType: 'bookingType',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, websiteType, bookingType, status} = selection
      const projectType = bookingType === 'goal-based' ? websiteType : subtitle
      return {
        title: title || 'Unknown Contact',
        subtitle: `${projectType || 'Unknown Project'} - Status: ${status || 'new'}`,
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
    {
      title: 'Booking Type',
      name: 'bookingTypeAsc',
      by: [{field: 'bookingType', direction: 'asc'}],
    },
  ],
}
