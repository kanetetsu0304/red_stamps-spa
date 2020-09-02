#!/bin/sh

aws s3 rm s3://sample-hosting-kaneko-redstamp/ --recursive
aws s3 cp dist s3://sample-kaneko-redstamp/ --recursive