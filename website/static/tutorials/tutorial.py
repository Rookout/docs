#!/usr/bin/env python
"""
=================
Rookout Python Tutorial Script
=================

This script is meant for the Rookout Python tutorial available at https://rookout.github.io/tutorial/python
"""

from threading import Timer
from time import sleep
import random


########################################################################################################################
# Copied from https://gist.github.com/alexbw/1187132
class RepeatingTimer(object):
    """
    USAGE:
    from time import sleep
    def myFunction(inputArgument):
        print(inputArgument)

    r = RepeatingTimer(0.5, myFunction, "hello")
    r.start(); sleep(2); r.interval = 0.05; sleep(2); r.stop()
    """

    def __init__(self, interval, function, *args, **kwargs):
        super(RepeatingTimer, self).__init__()
        self.args = args
        self.kwargs = kwargs
        self.function = function
        self.interval = interval

    def start(self):
        self.callback()

    def stop(self):
        self.interval = False

    def callback(self):
        if self.interval:
            self.function(*self.args, **self.kwargs)
            timer = Timer(self.interval, self.callback, )
            timer.daemon = True
            timer.start()

########################################################################################################################


animals = ["Aardvark",
           "Abyssinian",
           "Affenpinscher",
           "Akbash",
           "Akita",
           "Albatross",
           "Alligator",
           "Alpaca",
           "Angelfish",
           "Ant",
           "Zorse"]


class TestClass(object):
    def __init__(self, number, animal):
        self.number = number
        self.animal = animal


iteration = 0


def test_function():
    global iteration
    iteration += 1

    local_iteration = iteration
    obj = TestClass(random.random(), random.choice(animals))

    print("Iteration " + str(iteration))


def main():
    RepeatingTimer(5, test_function).start()
    sleep(2 ** 20)


from rook import auto_start
if "__main__" == __name__:
    main()
