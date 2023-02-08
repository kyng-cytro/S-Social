<template>
  <div
    class="border border-slate-300 bg-slate-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl mb-4 flex items-center justify-between px-6 py-6"
  >
    <div class="flex items-start flex-col space-y-2">
      <button
        class="flex items-center w-3/5 gap-2 dark:bg-gray-700 bg-gray-400 py-0.5 px-2 mb-5 text-slate-50 rounded-full text-sm hover:bg-slate-400 hover:dark:bg-slate-800 hover:ring-2 hover:ring-slate-300 hover:dark:ring-slate-700"
        v-if="claimCode"
        @click="copy_claim_code"
      >
        <svg
          fill="none"
          stroke="currentColor"
          class="h-5 w-5"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          v-if="!checked"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          ></path>
        </svg>
        <svg
          fill="none"
          stroke="currentColor"
          class="h-5 w-5"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          v-else
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          ></path>
        </svg>
        <span v-if="!checked">Copied</span>
        <span class="truncate text-xs sm:text-sm" v-else>{{ claimCode }}</span>
      </button>
      <nuxt-img
        class="h-16 w-16 border-2 border-gray-400 rounded-full"
        :src="profileImage"
      />
      <h2 class="font-semibold">{{ username }}</h2>
      <div class="text-xs text-gray-500 dark:text-gray-400 space-x-3">
        <button
          class="tracking-tighter hover:underline"
          @click="$emit('tab-to-1')"
        >
          {{ followers }} Followers
        </button>
        <button
          class="tracking-tighter hover:underline"
          @click="$emit('tab-to-2')"
        >
          {{ following }} Following
        </button>
      </div>
    </div>
    <!-- Log Out Button -->
    <div class="flex items-center" v-if="logout && !follow">
      <button
        class="text-sm bg-black rounded-xl px-1 py-2 sm:px-2 sm:py-2 hover:bg-red-500 text-white transition-all duration-150 ease-in-out"
        @click="$emit('handle_logout')"
      >
        <span>Log Out</span>
      </button>
    </div>

    <!-- Follow Button -->
    <div
      class="flex items-center"
      v-if="follow && !logout && user_id && friend_id != user_id"
    >
      <button
        class="text-sm bg-black rounded-xl p-2 text-white transition-all duration-150 ease-in-out"
        :class="is_following ? 'hover:bg-red-500' : 'hover:bg-gray-700'"
        @click="$emit('handle_follow')"
      >
        <span v-if="loading">
          <svg
            aria-hidden="true"
            class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </span>
        <span v-else>{{ is_following ? "Unfollow" : "Follow" }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { claimCode } = defineProps({
  username: String,
  profileImage: String,
  followers: Number,
  following: Number,
  user_id: String,
  friend_id: String,
  logout: Boolean,
  follow: Boolean,
  is_following: Boolean,
  loading: Boolean,
  claimCode: String,
});

const { ready: checked, start } = useTimeout(2000, { controls: true });

const { copy } = useClipboard();

const copy_claim_code = () => {
  start();
  copy(claimCode as string);
};
</script>
