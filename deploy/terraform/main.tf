terraform {
  required_version = ">= 1.7.0"
}

locals {
  project_name        = var.project_name
  environment         = var.environment
  object_storage_seam = var.object_storage_seam
  queue_seam          = var.queue_seam
}

output "workspace_summary" {
  value = "Placeholder AWS deployment target for ${local.project_name} (${local.environment}) preserving ${local.object_storage_seam} and ${local.queue_seam} seams"
}