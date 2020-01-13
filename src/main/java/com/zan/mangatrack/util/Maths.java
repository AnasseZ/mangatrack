package com.zan.mangatrack.util;

import java.util.Random;

public final class Maths {

    public static int getRandomNumberInRange(int min, int max) {
        return new Random().ints(min, (max + 1)).findFirst().getAsInt();
    }
}
