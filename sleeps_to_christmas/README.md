# SleepsToChristmas

Assignment from Programming by Stealth #127 at

https://pbs.bartificer.net/pbs127

This assignment was to be done in JavaScript with Node.js, but I am more
interested in learning Elixir, so that's how I did it.

## Problem to be Solved

The problem to be solved is to count down the number of nights of sleep
until Christmas.

## Implementation

I'm still learning my way through Elixir, so this is probably a bit brute
forced compared to more the elegant examples I've seen. But I have to start
somewhere.

The process is simple:

    Get the current date
    Get Christmas date for current year
    Add a year if Christmas is before the current date
    Calculate days until Christmas
    Output message for 0, 1, or more "sleeps" to Christmas
