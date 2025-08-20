<template>
    <div class="home">
       <h1>welcome to windtracker</h1>
       <div class="link-buttons">
            <RouterLink to="/track"><button>track</button></RouterLink>
            <RouterLink to="/search"><button>search</button></RouterLink>
            <RouterLink to="/blink"><button>blink</button></RouterLink>
       </div>
       <div class="github-buttons">
            <a href="https://github.com/vncz14/windtracker" target="_blank"><button>windtracker github</button></a>
            <a href="https://github.com/vncz14/goldfish" target="_blank"><button>goldfish github</button></a>
       </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.home {
    width: 100vw;
    height: 100vh;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.link-buttons, .github-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.link-buttons button {
    background-color: #222;
}

.github-buttons button {
    background-color: #333;
    font-size: 0.8em;
    padding: 8px 16px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;
}
</style>