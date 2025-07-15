terraform {
  required_providers {
    vultr = {
      source  = "vultr/vultr"
      version = "2.26.0"
    }
    ssh = {
      source = "loafoe/ssh"
    }
    acme = {
      source  = "vancluever/acme"
      version = "~> 2.33.0"
    }
  }
}

# Configure the Vultr Provider
provider "vultr" {
  api_key     = var.VULTR_API_KEY
  rate_limit  = 100
  retry_limit = 3
}
