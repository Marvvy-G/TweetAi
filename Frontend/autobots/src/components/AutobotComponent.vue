 <template>
  <div class="autobot">
    <div class="center">
      <div class="title">
        <h1>TWEETAI</h1>
        <h3 class="bottom">Welcome to TweetAI</h3>
      </div>
      <div class="autobot-count">
        <h3>The total count of Autobots is: {{ autobotCount }}</h3>   
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      autobotCount: 0, // Initialize the autobot count
      socket: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:3000'); 

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.socket.emit('getAutobotCount');
    });

    this.socket.on('autobotCount', (data) => {
      console.log('Received autobot count:', data);
      // Update the state with the new count
      if (data && data.total !== undefined) {
        this.autobotCount = data.total;
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect(); 
    }
  }
};
</script>

<style lang="scss" scoped>
.autobot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #FFF;

  .center {
    text-align: center;

    .title {
      margin-bottom: 20px;

      h1 {
        font-size: 72px;
        font-weight: 700;
        margin: 0;
        letter-spacing: 2px;
      }

      .bottom {
        font-size: 24px;
        font-weight: 400;
        margin-top: 10px;
        color: #BBB;
      }
    }

    .autobot-count {
      h3 {
        font-size: 28px;
        font-weight: 400;
        color: #FFF;
      }
    }
  }
}
</style>

