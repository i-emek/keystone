variable "project_name" {
  type        = string
  description = "Logical project name used for future AWS resources."
  default     = "keystone"
}

variable "environment" {
  type        = string
  description = "Deployment environment label for the future AWS landing zone."
  default     = "local-preview"
}

variable "object_storage_seam" {
  type        = string
  description = "Preserved local-to-AWS object storage seam."
  default     = "MiniStack -> AWS S3"
}

variable "queue_seam" {
  type        = string
  description = "Preserved local-to-AWS queue seam."
  default     = "ElasticMQ -> AWS SQS"
}