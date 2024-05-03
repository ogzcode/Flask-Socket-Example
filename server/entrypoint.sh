#!/bin/bash

flask db upgrade

exec flask run --host=0.0.0.0