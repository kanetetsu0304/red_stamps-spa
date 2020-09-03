#!/bin/sh

aws s3 rm s3://kaneko-redstamp/ --recursive
aws s3 cp dist s3://kaneko-redstamp/ --recursive