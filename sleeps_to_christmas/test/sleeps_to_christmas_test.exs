defmodule SleepsToChristmasTest do
  use ExUnit.Case
  # doctest SleepsToChristmas

  test "days until Christmas" do
    assert SleepsToChristmas.sleeps()
    |> String.match?(~r/Christmas/)
  end

  test "check when date is Christmas" do
    assert SleepsToChristmas.days_to_next_christmas(~D[2021-12-25]) === 0
  end

  test "check for Christmas eve" do
    assert SleepsToChristmas.days_to_next_christmas(~D[2021-12-24]) === 1
  end

  test "check for day after Christmas" do
    assert SleepsToChristmas.days_to_next_christmas(~D[2021-12-26]) === 364
  end

end
