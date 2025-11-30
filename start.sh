#!/bin/bash

# CURRRRRRENTLY UNUSED

# start Anvil in background
anvil &

# Give Anvil a second to start
sleep 2

# Run Wake tests
wake test tests/test_example.py

# Keep container alive if needed
tail -f /dev/null
