resource "aws_instance" "app_server" {
  # ami           = "ami-09dac21d1664bc313"  # official one
  # ami           = "ami-0ce99c18a68a1b23b"  # customized one
  # ami           = "ami-008269b555cf0a1bb"  # customized one
  ami           = "packer-linux-aws-node-22" # i-075f3890ec56e9399
  instance_type = "t2.micro"
  key_name      = var.key_name

  tags = {
    Name = "Make Appointment"
  }
  provisioner "local-exec" {
    command = "sh modify_ip.sh ${self.public_ip}"
  }
  metadata_options {
    http_tokens = "required"
  }
}
