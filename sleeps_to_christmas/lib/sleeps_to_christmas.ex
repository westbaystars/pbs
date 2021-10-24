defmodule SleepsToChristmas do
  import Date

  @moduledoc """
  Documentation for `SleepsToChristmas`.
  """

  @doc """
  Elixir implementation of Sleeps to Christmas project.

  ## To execute:

      iex> SleepsToChristmas.sleeps()
      67 sleeps 😴 till Christmas 🎄

  """
  def sleeps do
    local_date()                  # Get the current date
    |> sleeps()
  end

  def sleeps(date) do
    date
    |> days_to_next_christmas()   # Calculate the number of days until Christmas
    |> phrase()                   # Generate phrase
  end

  defp phrase(0), do: "No more sleeps — it's Christmas 😀🎄🎁"
  defp phrase(1), do: "The sleep 😴 before Christmas 🎄"
  defp phrase(days), do: "#{days} sleeps 😴 till Christmas 🎄"

  def days_to_next_christmas(date) do
    christmas = new!(date.year, 12, 25)
    compare(date, christmas)
    |> add_year_if_greater(christmas)
    |> range(date)
    |> Enum.count()
    |> subtract(1)   # The range is inclusive on both ends, so -1 for difference
  end

  def subtract(value, quantity), do: value - quantity

  def add_year_if_greater(:gt, date) do
    new!(date.year + 1, date.month, date.day)
  end
  def add_year_if_greater(_, date), do: date

  defp local_date() do
    {erl_date, _erl_time} = :calendar.local_time()
    from_erl!(erl_date)
  end
end
