defmodule SleepsToChristmasTest do
  use ExUnit.Case
  # doctest SleepsToChristmas

  test "days until Christmas" do
    assert SleepsToChristmas.sleeps()
    |> String.match?(~r/Christmas/)
  end
end
