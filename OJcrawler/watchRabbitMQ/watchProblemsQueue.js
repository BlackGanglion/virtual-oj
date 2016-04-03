'use strict';

import connection from '../../init/database';
import amqp from 'amqplib/callback_api';
import logger from '../../init/log';
import { getFromQueue } from '../../init/rabbitMQ';

getFromQueue('problem');
