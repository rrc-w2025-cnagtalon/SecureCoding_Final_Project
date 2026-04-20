# New Component Research and Planning

## Compnent Chosen: Node-cron for scheduled tasks

## Why I picked this:

Currently, at the end of the day, a manager has to manually go through all the order slips and identify how many of each kind of the kakanin needs to be made to fulfil the next day's pre orders. I chose node-cron bevause it allows the API to be proactive by automating the preperation of the next day's bake list, which will save a lot of time.

## How I will use it in the API

I will implement a scheduled service that triggers every day after the store closes (6pm)

The scheduler will trigger a function that takes all the orders scdehduled for the following day's pickupDate.

Then it will aggreagte the total numver of pieces for each product (5 order slips with 3x 12pcs Puto Cheese will be aggregated to 36pcs Puto Cheese).

It will then generate a new document providing a consolidated prep sheet for the morning staff.

## Current implemetnation 

Installed dependencies and created the initScheduler() to start a task (print to console) every minute for testing.
