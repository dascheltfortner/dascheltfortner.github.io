const Inch = 4;
const Foot = 12 * Inch;
const inches = num => Inch * num;
const feet = num => Foot * num;
const RoomWidth = 11 * Foot + 8 * Inch;
const RoomHeight = 15 * Foot + 8 * Inch;
const BackgroundColor = '#9cbbed';
const GridColor = '#ffffff';

const CanvasElement = document.getElementById('room-canvas');
CanvasElement.width = RoomWidth;
CanvasElement.height = RoomHeight;

const Context = CanvasElement.getContext('2d');

const Dimensions = {
  ac: [ feet(2) + inches(3), feet(2) ],
  door: [ feet(3), inches(6) ],
  window: [ inches(69), inches(6) ],
  bed: [ feet(3) + inches(6), feet(7) + Inch ],
  dresser: [ feet(2) + inches(6), Foot + inches(7) ],
  desk: [ feet(2), inches(42) ],
  wardrobe: [ feet(2), feet(3) + Inch ]
};

const InitialPositions = {
};

const StaticItemColor = 'rgb(0, 0, 0, 0.3)';
const WoodColor = '#8e775b';

const createEntity = (dimensions, x, y, color, label, static = true) => {
  return new Entity({ width: dimensions[0], height: dimensions[1], color, x, y, label, static });
}

const Items = [
  createEntity(Dimensions.bed, RoomWidth - Dimensions.bed[0], 100, WoodColor, 'Bed', false),
  createEntity(Dimensions.desk, 0, 0, WoodColor, 'Desk', false),
  createEntity(Dimensions.desk, 0, Dimensions.desk[1], WoodColor, 'Desk', false),
  createEntity(Dimensions.wardrobe, 0, Dimensions.desk[1] * 2, WoodColor, 'Wardrobe', false),
  createEntity(Dimensions.wardrobe, 0, Dimensions.wardrobe[1] + Dimensions.desk[1] * 2, WoodColor, 'Wardrobe', false),
  createEntity(Dimensions.dresser, 100, 100, WoodColor, 'Dresser', false),
  createEntity(Dimensions.dresser, 100, 200, WoodColor, 'Dresser', false),
  createEntity(Dimensions.ac, RoomWidth - Dimensions.ac[0], 0, StaticItemColor, 'AC Unit'),
  createEntity(Dimensions.door, (RoomWidth - Dimensions.door[0]) / 2, RoomHeight - Dimensions.door[1], StaticItemColor, 'Door'),
  createEntity(Dimensions.window, feet(2) + inches(4), 0, StaticItemColor, 'Window'),
];

const drawGrid = gridSize => {
  Context.fillStyle = BackgroundColor;
  Context.fillRect(0, 0, RoomWidth, RoomHeight);
  Context.fillStyle = GridColor;
  for(let i = 0; i < RoomHeight; i += gridSize) {
    Context.fillRect(0, i, RoomWidth, 1);
  }

  for(let i = 0; i < RoomWidth; i += gridSize) {
    Context.fillRect(i, 0, 1, RoomHeight);
  }
};

const render = () => {
  drawGrid(Foot);
  Items.forEach(item => item.render(Context));
};

let draggedItem = null;
let mousePosition = { x: 0, y: 0 };
let bunked = true;

const updateMousePosition = event => {
  let canvasBounds = CanvasElement.getBoundingClientRect();
  mousePosition = {
    x: event.clientX - canvasBounds.left,
    y: event.clientY - canvasBounds.top
  };
};

const onMouseMove = event => {
  let previousMousePosition = Object.assign({}, mousePosition);
  updateMousePosition(event);
  if(draggedItem) {
    let dx = mousePosition.x - previousMousePosition.x;
    let dy = mousePosition.y - previousMousePosition.y;
    draggedItem.translate(dx, dy);
    draggedItem.containTo(RoomWidth, RoomHeight);
  }
  render();
};

const onMouseDoubleClick = event => {
  for(item of Items) {
    if(item.isContained(mousePosition.x, mousePosition.y)) {
      item.rotate();
      item.containTo(RoomWidth, RoomHeight);
    }
  }
  render();
};

const onMouseDown = event => {
  for(item of Items) {
    if(item.isContained(mousePosition.x, mousePosition.y)) {
      draggedItem = item;
    }
  }
};

const flipRoom = () => {
  let ac = Items.find(item => item.label === 'AC Unit');
  let win = Items.find(item => item.label === 'Window');

  if(ac.xPos === 0) {
    ac.xPos = RoomWidth - Dimensions.ac[0];
    win.xPos = feet(2) + inches(4);
  } else {
    ac.xPos = 0;
    win.xPos = RoomWidth - Dimensions.window[0] - feet(2) - inches(4);
  }

  render();
};

const flipBunkStatus = () => {
  if(bunked) {
    Items.push(createEntity(Dimensions.bed, RoomWidth / 2 - Dimensions.bed[0], feet(3), WoodColor, 'Bed', false));
    changeBunkButtonText('Bunk');
    bunked = false;
  } else {
    Items.pop(Items.find(item => item.label === 'Bed'));
    changeBunkButtonText('Unbunk');
    bunked = true;
  }

  render();
};

const changeBunkButtonText = text => {
  document.getElementById('bunk-button').value = text;
};

CanvasElement.addEventListener('mousemove', onMouseMove);
CanvasElement.addEventListener('mousedown', onMouseDown);
CanvasElement.addEventListener('mouseup', () => draggedItem = null);
CanvasElement.addEventListener('dblclick', onMouseDoubleClick);

render();
