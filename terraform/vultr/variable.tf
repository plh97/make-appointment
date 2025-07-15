variable "VULTR_API_KEY" {
  type = string
  # default   = "${env("VULTR_API_KEY")}"
}

variable "ssh_key_id" {
  type    = string
  default = "78967a3f-a187-4d1c-83b7-1bf6bef16923"
}
