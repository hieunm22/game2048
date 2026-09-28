import { describe, expect, test } from "vitest"
import { swipeDirection } from "./common"

describe("swipeDirection", () => {
	test("the longer axis decides the direction", () => {
		expect(swipeDirection(80, 20)).toBe("right")
		expect(swipeDirection(-80, 20)).toBe("left")
		expect(swipeDirection(20, 80)).toBe("down")
		expect(swipeDirection(20, -80)).toBe("up")
	})

	test("a drag shorter than the threshold is a tap", () => {
		expect(swipeDirection(10, -12)).toBeNull()
	})
})
