export default {
  methods: {
    peerNameForPublicKey (publicKey) {
      const peer = this.peerForPublicKey(publicKey)
      return (peer && peer.alias) || publicKey
    },

    peerColorForPublicKey (publicKey) {
      const peer = this.peerForPublicKey(publicKey)
      return (peer && peer.color) || '#000000'
    },

    peerForPublicKey (publicKey) {
      const { peers } = this.$store.state.peers
      return peers.find(peer => peer.publicKey === publicKey)
    }
  }
}
