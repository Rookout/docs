/*
=================
Rookout Java Tutorial Script
=================

This script is meant for the Rookout Java tutorial available at https://rookout.github.io/tutorial/java
 */

import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public class Tutorial {
    public static void main(String[] args) {
        new Tutorial().run();;
    }

    void run() {
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
               testFunction();
            }
        }, 0, 5000);
    }

    void testFunction() {
        ++iteration;

        int localIteration = iteration;
        Object obj = new TestClass(random.nextInt(), animals[random.nextInt(animals.length)]);

        System.out.println("Iteration " + iteration);
    }

    class TestClass {
        TestClass(int number, String animal) {
            this.number = number;
            this.animal = animal;
        }

        int number;
        String animal;
    }

    static final String[] animals = {
            "Aardvark",
            "Abyssinian",
            "Affenpinscher",
            "Akbash",
            "Akita",
            "Albatross",
            "Alligator",
            "Alpaca",
            "Angelfish",
            "Ant",
            "Zorse"};


    int iteration = 0;
    Random random = new Random();
}
