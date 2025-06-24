"use strict";
/**
 * MCP Location Tools for GoHighLevel Integration
 * Exposes location/sub-account management capabilities to the MCP server
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationTools = void 0;
/**
 * Location Tools Class
 * Implements MCP tools for location and sub-account management
 */
class LocationTools {
    ghlClient;
    constructor(ghlClient) {
        this.ghlClient = ghlClient;
    }
    /**
     * Get all location tool definitions for MCP server
     */
    getToolDefinitions() {
        return [
            {
                name: 'search_locations',
                description: 'Search for locations/sub-accounts in GoHighLevel with filtering options',
                inputSchema: {
                    type: 'object',
                    properties: {
                        companyId: {
                            type: 'string',
                            description: 'Company/Agency ID to filter locations'
                        },
                        skip: {
                            type: 'number',
                            description: 'Number of results to skip for pagination (default: 0)',
                            default: 0
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of locations to return (default: 10)',
                            default: 10
                        },
                        order: {
                            type: 'string',
                            enum: ['asc', 'desc'],
                            description: 'Order of results (default: asc)',
                            default: 'asc'
                        },
                        email: {
                            type: 'string',
                            description: 'Filter by email address',
                            format: 'email'
                        }
                    }
                }
            },
            {
                name: 'get_location',
                description: 'Get detailed information about a specific location/sub-account by ID',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The unique ID of the location to retrieve'
                        }
                    },
                    required: ['locationId']
                }
            },
            {
                name: 'create_location',
                description: 'Create a new sub-account/location in GoHighLevel (Agency Pro plan required)',
                inputSchema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the sub-account/location'
                        },
                        companyId: {
                            type: 'string',
                            description: 'Company/Agency ID'
                        },
                        phone: {
                            type: 'string',
                            description: 'Phone number with country code (e.g., +1410039940)'
                        },
                        address: {
                            type: 'string',
                            description: 'Business address'
                        },
                        city: {
                            type: 'string',
                            description: 'City where business is located'
                        },
                        state: {
                            type: 'string',
                            description: 'State where business operates'
                        },
                        country: {
                            type: 'string',
                            description: '2-letter country code (e.g., US, CA, GB)'
                        },
                        postalCode: {
                            type: 'string',
                            description: 'Postal/ZIP code'
                        },
                        website: {
                            type: 'string',
                            description: 'Business website URL'
                        },
                        timezone: {
                            type: 'string',
                            description: 'Business timezone (e.g., US/Central)'
                        },
                        prospectInfo: {
                            type: 'object',
                            properties: {
                                firstName: { type: 'string', description: 'Prospect first name' },
                                lastName: { type: 'string', description: 'Prospect last name' },
                                email: { type: 'string', format: 'email', description: 'Prospect email' }
                            },
                            required: ['firstName', 'lastName', 'email'],
                            description: 'Prospect information for the location'
                        },
                        snapshotId: {
                            type: 'string',
                            description: 'Snapshot ID to load into the location'
                        }
                    },
                    required: ['name', 'companyId']
                }
            },
            {
                name: 'update_location',
                description: 'Update an existing sub-account/location in GoHighLevel',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The unique ID of the location to update'
                        },
                        name: {
                            type: 'string',
                            description: 'Updated name of the sub-account/location'
                        },
                        companyId: {
                            type: 'string',
                            description: 'Company/Agency ID'
                        },
                        phone: {
                            type: 'string',
                            description: 'Updated phone number'
                        },
                        address: {
                            type: 'string',
                            description: 'Updated business address'
                        },
                        city: {
                            type: 'string',
                            description: 'Updated city'
                        },
                        state: {
                            type: 'string',
                            description: 'Updated state'
                        },
                        country: {
                            type: 'string',
                            description: 'Updated 2-letter country code'
                        },
                        postalCode: {
                            type: 'string',
                            description: 'Updated postal/ZIP code'
                        },
                        website: {
                            type: 'string',
                            description: 'Updated website URL'
                        },
                        timezone: {
                            type: 'string',
                            description: 'Updated timezone'
                        }
                    },
                    required: ['locationId', 'companyId']
                }
            },
            {
                name: 'delete_location',
                description: 'Delete a sub-account/location from GoHighLevel',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The unique ID of the location to delete'
                        },
                        deleteTwilioAccount: {
                            type: 'boolean',
                            description: 'Whether to delete associated Twilio account',
                            default: false
                        }
                    },
                    required: ['locationId', 'deleteTwilioAccount']
                }
            },
            // Location Tags Tools
            {
                name: 'get_location_tags',
                description: 'Get all tags for a specific location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID to get tags from'
                        }
                    },
                    required: ['locationId']
                }
            },
            {
                name: 'create_location_tag',
                description: 'Create a new tag for a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID to create tag in'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the tag to create'
                        }
                    },
                    required: ['locationId', 'name']
                }
            },
            {
                name: 'get_location_tag',
                description: 'Get a specific location tag by ID',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        tagId: {
                            type: 'string',
                            description: 'The tag ID to retrieve'
                        }
                    },
                    required: ['locationId', 'tagId']
                }
            },
            {
                name: 'update_location_tag',
                description: 'Update an existing location tag',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        tagId: {
                            type: 'string',
                            description: 'The tag ID to update'
                        },
                        name: {
                            type: 'string',
                            description: 'Updated name for the tag'
                        }
                    },
                    required: ['locationId', 'tagId', 'name']
                }
            },
            {
                name: 'delete_location_tag',
                description: 'Delete a location tag',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        tagId: {
                            type: 'string',
                            description: 'The tag ID to delete'
                        }
                    },
                    required: ['locationId', 'tagId']
                }
            },
            // Location Tasks Tools
            {
                name: 'search_location_tasks',
                description: 'Search tasks within a location with advanced filtering',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID to search tasks in'
                        },
                        contactId: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Filter by specific contact IDs'
                        },
                        completed: {
                            type: 'boolean',
                            description: 'Filter by completion status'
                        },
                        assignedTo: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Filter by assigned user IDs'
                        },
                        query: {
                            type: 'string',
                            description: 'Search query for task content'
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of tasks to return (default: 25)',
                            default: 25
                        },
                        skip: {
                            type: 'number',
                            description: 'Number of tasks to skip for pagination (default: 0)',
                            default: 0
                        },
                        businessId: {
                            type: 'string',
                            description: 'Business ID filter'
                        }
                    },
                    required: ['locationId']
                }
            },
            // Custom Fields Tools
            {
                name: 'get_location_custom_fields',
                description: 'Get custom fields for a location, optionally filtered by model type',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        model: {
                            type: 'string',
                            enum: ['contact', 'opportunity', 'all'],
                            description: 'Filter by model type (default: all)',
                            default: 'all'
                        }
                    },
                    required: ['locationId']
                }
            },
            {
                name: 'create_location_custom_field',
                description: 'Create a new custom field for a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the custom field'
                        },
                        dataType: {
                            type: 'string',
                            description: 'Data type of the field (TEXT, NUMBER, DATE, etc.)'
                        },
                        placeholder: {
                            type: 'string',
                            description: 'Placeholder text for the field'
                        },
                        model: {
                            type: 'string',
                            enum: ['contact', 'opportunity'],
                            description: 'Model to create the field for',
                            default: 'contact'
                        },
                        position: {
                            type: 'number',
                            description: 'Position/order of the field (default: 0)',
                            default: 0
                        }
                    },
                    required: ['locationId', 'name', 'dataType']
                }
            },
            {
                name: 'get_location_custom_field',
                description: 'Get a specific custom field by ID',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customFieldId: {
                            type: 'string',
                            description: 'The custom field ID to retrieve'
                        }
                    },
                    required: ['locationId', 'customFieldId']
                }
            },
            {
                name: 'update_location_custom_field',
                description: 'Update an existing custom field',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customFieldId: {
                            type: 'string',
                            description: 'The custom field ID to update'
                        },
                        name: {
                            type: 'string',
                            description: 'Updated name of the custom field'
                        },
                        placeholder: {
                            type: 'string',
                            description: 'Updated placeholder text'
                        },
                        position: {
                            type: 'number',
                            description: 'Updated position/order'
                        }
                    },
                    required: ['locationId', 'customFieldId', 'name']
                }
            },
            {
                name: 'delete_location_custom_field',
                description: 'Delete a custom field from a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customFieldId: {
                            type: 'string',
                            description: 'The custom field ID to delete'
                        }
                    },
                    required: ['locationId', 'customFieldId']
                }
            },
            // Custom Values Tools
            {
                name: 'get_location_custom_values',
                description: 'Get all custom values for a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        }
                    },
                    required: ['locationId']
                }
            },
            {
                name: 'create_location_custom_value',
                description: 'Create a new custom value for a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the custom value field'
                        },
                        value: {
                            type: 'string',
                            description: 'Value to assign'
                        }
                    },
                    required: ['locationId', 'name', 'value']
                }
            },
            {
                name: 'get_location_custom_value',
                description: 'Get a specific custom value by ID',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customValueId: {
                            type: 'string',
                            description: 'The custom value ID to retrieve'
                        }
                    },
                    required: ['locationId', 'customValueId']
                }
            },
            {
                name: 'update_location_custom_value',
                description: 'Update an existing custom value',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customValueId: {
                            type: 'string',
                            description: 'The custom value ID to update'
                        },
                        name: {
                            type: 'string',
                            description: 'Updated name'
                        },
                        value: {
                            type: 'string',
                            description: 'Updated value'
                        }
                    },
                    required: ['locationId', 'customValueId', 'name', 'value']
                }
            },
            {
                name: 'delete_location_custom_value',
                description: 'Delete a custom value from a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        customValueId: {
                            type: 'string',
                            description: 'The custom value ID to delete'
                        }
                    },
                    required: ['locationId', 'customValueId']
                }
            },
            // Templates Tools
            {
                name: 'get_location_templates',
                description: 'Get SMS/Email templates for a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        originId: {
                            type: 'string',
                            description: 'Origin ID (required parameter)'
                        },
                        deleted: {
                            type: 'boolean',
                            description: 'Include deleted templates (default: false)',
                            default: false
                        },
                        skip: {
                            type: 'number',
                            description: 'Number to skip for pagination (default: 0)',
                            default: 0
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number to return (default: 25)',
                            default: 25
                        },
                        type: {
                            type: 'string',
                            enum: ['sms', 'email', 'whatsapp'],
                            description: 'Filter by template type'
                        }
                    },
                    required: ['locationId', 'originId']
                }
            },
            {
                name: 'delete_location_template',
                description: 'Delete a template from a location',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'The location ID'
                        },
                        templateId: {
                            type: 'string',
                            description: 'The template ID to delete'
                        }
                    },
                    required: ['locationId', 'templateId']
                }
            },
            // Timezones Tool
            {
                name: 'get_timezones',
                description: 'Get available timezones for location configuration',
                inputSchema: {
                    type: 'object',
                    properties: {
                        locationId: {
                            type: 'string',
                            description: 'Optional location ID'
                        }
                    }
                }
            }
        ];
    }
    /**
     * Execute location tool based on tool name and arguments
     */
    async executeTool(name, args) {
        switch (name) {
            // Location Management
            case 'search_locations':
                return this.searchLocations(args);
            case 'get_location':
                return this.getLocation(args);
            case 'create_location':
                return this.createLocation(args);
            case 'update_location':
                return this.updateLocation(args);
            case 'delete_location':
                return this.deleteLocation(args);
            // Location Tags
            case 'get_location_tags':
                return this.getLocationTags(args);
            case 'create_location_tag':
                return this.createLocationTag(args);
            case 'get_location_tag':
                return this.getLocationTag(args);
            case 'update_location_tag':
                return this.updateLocationTag(args);
            case 'delete_location_tag':
                return this.deleteLocationTag(args);
            // Location Tasks
            case 'search_location_tasks':
                return this.searchLocationTasks(args);
            // Custom Fields
            case 'get_location_custom_fields':
                return this.getLocationCustomFields(args);
            case 'create_location_custom_field':
                return this.createLocationCustomField(args);
            case 'get_location_custom_field':
                return this.getLocationCustomField(args);
            case 'update_location_custom_field':
                return this.updateLocationCustomField(args);
            case 'delete_location_custom_field':
                return this.deleteLocationCustomField(args);
            // Custom Values
            case 'get_location_custom_values':
                return this.getLocationCustomValues(args);
            case 'create_location_custom_value':
                return this.createLocationCustomValue(args);
            case 'get_location_custom_value':
                return this.getLocationCustomValue(args);
            case 'update_location_custom_value':
                return this.updateLocationCustomValue(args);
            case 'delete_location_custom_value':
                return this.deleteLocationCustomValue(args);
            // Templates
            case 'get_location_templates':
                return this.getLocationTemplates(args);
            case 'delete_location_template':
                return this.deleteLocationTemplate(args);
            // Timezones
            case 'get_timezones':
                return this.getTimezones(args);
            default:
                throw new Error(`Unknown location tool: ${name}`);
        }
    }
    async searchLocations(params) {
        try {
            const response = await this.ghlClient.searchLocations(params);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const locations = response.data.locations || [];
            return {
                success: true,
                locations,
                message: `Found ${locations.length} locations`
            };
        }
        catch (error) {
            throw new Error(`Failed to search locations: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocation(params) {
        try {
            const response = await this.ghlClient.getLocationById(params.locationId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                location: response.data.location,
                message: 'Location retrieved successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to get location: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationTags(params) {
        try {
            const response = await this.ghlClient.getLocationTags(params.locationId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const tags = response.data.tags || [];
            return {
                success: true,
                tags,
                message: `Retrieved ${tags.length} location tags`
            };
        }
        catch (error) {
            throw new Error(`Failed to get location tags: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async createLocation(params) {
        try {
            const response = await this.ghlClient.createLocation(params);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                location: response.data,
                message: `Location "${params.name}" created successfully`
            };
        }
        catch (error) {
            throw new Error(`Failed to create location: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateLocation(params) {
        try {
            const { locationId, ...updateData } = params;
            const response = await this.ghlClient.updateLocation(locationId, updateData);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                location: response.data,
                message: 'Location updated successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to update location: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deleteLocation(params) {
        try {
            const response = await this.ghlClient.deleteLocation(params.locationId, params.deleteTwilioAccount);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                message: response.data.message || 'Location deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete location: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async createLocationTag(params) {
        try {
            const response = await this.ghlClient.createLocationTag(params.locationId, { name: params.name });
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                tag: response.data.tag,
                message: `Tag "${params.name}" created successfully`
            };
        }
        catch (error) {
            throw new Error(`Failed to create location tag: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationTag(params) {
        try {
            const response = await this.ghlClient.getLocationTag(params.locationId, params.tagId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                tag: response.data.tag,
                message: 'Location tag retrieved successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to get location tag: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateLocationTag(params) {
        try {
            const response = await this.ghlClient.updateLocationTag(params.locationId, params.tagId, { name: params.name });
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                tag: response.data.tag,
                message: 'Location tag updated successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to update location tag: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deleteLocationTag(params) {
        try {
            const response = await this.ghlClient.deleteLocationTag(params.locationId, params.tagId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                message: 'Location tag deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete location tag: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async searchLocationTasks(params) {
        try {
            const { locationId, ...searchParams } = params;
            const response = await this.ghlClient.searchLocationTasks(locationId, searchParams);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const tasks = response.data.tasks || [];
            return {
                success: true,
                tasks,
                message: `Found ${tasks.length} tasks`
            };
        }
        catch (error) {
            throw new Error(`Failed to search location tasks: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationCustomFields(params) {
        try {
            const response = await this.ghlClient.getLocationCustomFields(params.locationId, params.model);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const customFields = response.data.customFields || [];
            return {
                success: true,
                customFields,
                message: `Retrieved ${customFields.length} custom fields`
            };
        }
        catch (error) {
            throw new Error(`Failed to get custom fields: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async createLocationCustomField(params) {
        try {
            const { locationId, ...fieldData } = params;
            const response = await this.ghlClient.createLocationCustomField(locationId, fieldData);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customField: response.data.customField,
                message: `Custom field "${params.name}" created successfully`
            };
        }
        catch (error) {
            throw new Error(`Failed to create custom field: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationCustomField(params) {
        try {
            const response = await this.ghlClient.getLocationCustomField(params.locationId, params.customFieldId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customField: response.data.customField,
                message: 'Custom field retrieved successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to get custom field: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateLocationCustomField(params) {
        try {
            const { locationId, customFieldId, ...fieldData } = params;
            const response = await this.ghlClient.updateLocationCustomField(locationId, customFieldId, fieldData);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customField: response.data.customField,
                message: 'Custom field updated successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to update custom field: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deleteLocationCustomField(params) {
        try {
            const response = await this.ghlClient.deleteLocationCustomField(params.locationId, params.customFieldId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                message: 'Custom field deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete custom field: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationCustomValues(params) {
        try {
            const response = await this.ghlClient.getLocationCustomValues(params.locationId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const customValues = response.data.customValues || [];
            return {
                success: true,
                customValues,
                message: `Retrieved ${customValues.length} custom values`
            };
        }
        catch (error) {
            throw new Error(`Failed to get custom values: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async createLocationCustomValue(params) {
        try {
            const { locationId, ...valueData } = params;
            const response = await this.ghlClient.createLocationCustomValue(locationId, valueData);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customValue: response.data.customValue,
                message: `Custom value "${params.name}" created successfully`
            };
        }
        catch (error) {
            throw new Error(`Failed to create custom value: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationCustomValue(params) {
        try {
            const response = await this.ghlClient.getLocationCustomValue(params.locationId, params.customValueId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customValue: response.data.customValue,
                message: 'Custom value retrieved successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to get custom value: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async updateLocationCustomValue(params) {
        try {
            const { locationId, customValueId, ...valueData } = params;
            const response = await this.ghlClient.updateLocationCustomValue(locationId, customValueId, valueData);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                customValue: response.data.customValue,
                message: 'Custom value updated successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to update custom value: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deleteLocationCustomValue(params) {
        try {
            const response = await this.ghlClient.deleteLocationCustomValue(params.locationId, params.customValueId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                message: 'Custom value deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete custom value: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getLocationTemplates(params) {
        try {
            const { locationId, ...templateParams } = params;
            const response = await this.ghlClient.getLocationTemplates(locationId, templateParams);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const templates = response.data.templates || [];
            const totalCount = response.data.totalCount || templates.length;
            return {
                success: true,
                templates,
                totalCount,
                message: `Retrieved ${templates.length} templates (${totalCount} total)`
            };
        }
        catch (error) {
            throw new Error(`Failed to get location templates: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async deleteLocationTemplate(params) {
        try {
            const response = await this.ghlClient.deleteLocationTemplate(params.locationId, params.templateId);
            if (!response.success) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            return {
                success: true,
                message: 'Template deleted successfully'
            };
        }
        catch (error) {
            throw new Error(`Failed to delete template: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async getTimezones(params) {
        try {
            const response = await this.ghlClient.getTimezones(params.locationId);
            if (!response.success || !response.data) {
                const errorMsg = response.error?.message || 'Unknown API error';
                throw new Error(`API request failed: ${errorMsg}`);
            }
            const timezones = Array.isArray(response.data) ? response.data : [];
            return {
                success: true,
                timezones,
                message: `Retrieved ${timezones.length} available timezones`
            };
        }
        catch (error) {
            throw new Error(`Failed to get timezones: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
exports.LocationTools = LocationTools;
