defmodule MenuItem do
  @moduledoc """
  A replicator menu item.
  """

  @typedoc """
  The charge amount for an item.

  The amount of replicator charge it costs to replicate a given item.
  Must be greater than 0.
  """
  @type charge_amount :: non_neg_integer

  @typedoc """
  A menu item.

  ## Properties

  enenergy_cost: The amount of replicator charge it costs to replicate one of the item.
  icon: An icon to represent the item, ideally an emoji.
  """
  @type t :: %__MODULE__{
          energy_cost: charge_amount(),
          icon: String.t()
        }
  defstruct ~w[energy_cost icon]a

  @doc """
  Create a new `%MenuItem{...}`.

  ## Parameters

  * enenergy_cost: The amount of replicator charge it costs to replicate one of the item.
  * icon: An icon to represent the item, ideally an emoji.

  ## Returns

  Returns a new `%MenuItem{...}`.
  Returns `nil` if passed invalid parameters.
  """
  def new(energy_cost, icon) when is_integer(energy_cost) and energy_cost > 0
    and is_binary(icon) and byte_size(icon) > 0, do: %MenuItem{
      energy_cost: energy_cost,
      icon: icon
    }
  def new(_energy_cost, _icon), do: nil
end
