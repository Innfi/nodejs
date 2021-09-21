
provider "aws" {
	region = "ap-northeast-2"
	shared_credentials_file = "~/.aws/credentials"
	profile = "default"
}

resource "aws_s3_bucket" "image_bucket" {
	bucket = "image_bucket" 
	acl = "public-read-write"

	cors_rule {
		allowed_headers = ["*"] 
		allowed_methods = ["PUT", "POST"]
		allowed_origins = ["*"]
	}
}