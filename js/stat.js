'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const TEXT_HEIGHT = 20;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const MAX_BAR_HEIGHT = CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT * 2 - GAP * 3 - TEXT_HEIGHT * 2;
const TEXT_COLOR = `#000`;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = (ctx, x, y, color, message, font, aligning) => {
  ctx.font = font ? font : ``;
  ctx.textBaseline = aligning ? aligning : ``;
  ctx.fillStyle = color;
  ctx.fillText(message, x, y);
};

const renderBar = (ctx, x, y, player, playersTime, maxTime) => {
  if (player === `Вы`) {
    ctx.fillStyle = `rgb(255, 0, 0, 1)`;
  } else {
    let playersColor = `hsl(` + 240 + `,` +
    (100 * Math.random()) + `%,` +
    50 + `%)`;
    ctx.fillStyle = playersColor;
  }
  const barHeight = (MAX_BAR_HEIGHT * playersTime) / maxTime;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );


  const maxTime = Math.max(...times);

  for (let i = 0; i < players.length; i++) {
    const barX = CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i;
    const barY = CLOUD_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime - CLOUD_Y - TEXT_HEIGHT;
    const scoreX = CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i;
    const scoreY = CLOUD_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime - TEXT_HEIGHT * 2;
    const playerNameX = CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i;
    const playerNameY = CLOUD_HEIGHT - CLOUD_Y;

    renderBar(ctx, barX, barY, players[i], times[i], maxTime);
    renderText(ctx, scoreX, scoreY, TEXT_COLOR, Math.round(times[i]));
    renderText(ctx, playerNameX, playerNameY, TEXT_COLOR, players[i]);
  }

  renderText(
      ctx,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 2,
      TEXT_COLOR,
      `Ура, вы победили!`,
      `16px PT Mono`,
      `hanging`
  );
  renderText(
      ctx,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 4,
      TEXT_COLOR,
      `Список результатов:`,
      `16px PT Mono`,
      `hanging`
  );
};


