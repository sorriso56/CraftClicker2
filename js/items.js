var Items = Class.define(
{
  statics:
  {
    _items: [],
    _nameMap: {},
    add: function(oArgs)
    {
      if (Items._nameMap[oArgs.name])
      {
        throw new Error("Item with name: " + oArgs.name + " already exists.");
      }
      
      oArgs.id = Items._items.length;
      var oItem = Items._nameMap[oArgs.name] = new Item(oArgs);
      Items._items.push(oItem);
    },
    get: function(idOrName)
    {
      if (Items._nameMap[idOrName])
      {
        return Items._nameMap[idOrName];
      }
      else if (Items._items[idOrName])
      {
        return Items._items[idOrName];
      }
      else
      {
        throw new Error("Cannot find item with identifier: " + idOrName);
      }
    },
    iterate: function(f)
    {
      this._items.iterate(f);
    }
  }
});

Items.add({ name: "Stone" });
Items.add({ name: "Wood" });
Items.add(
{
  name: "Wood Plank",
  recipe: new Recipe(
  {
    makes: 4,
    ingredients:
    [
      {
        item: Items.get("Wood"),
        amount: 1
      }
    ]
  })
});

Items.add(
{
  name: "Stick",
  recipe: new Recipe(
  {
    makes: 2,
    ingredients:
    [
      {
        item: Items.get("Wood Plank"),
        amount: 1
      }
    ]
  })
});

Items.add(
{
  name: "Workbench",
  recipe: new Recipe(
  {
    ingredients:
    [
      [
        {
          item: Items.get("Wood Plank"),
          amount: 1
        },
        {
          item: Items.get("Stick"),
          amount: 1
        }
      ],
      [
        {
          item: Items.get("Stick"),
          amount: 1
        },
        {
          item: Items.get("Wood Plank"),
          amount: 1
        }
      ]
    ]
  })
});