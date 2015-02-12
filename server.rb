# This file provided by Facebook is for non-commercial testing and evaluation purposes only.
# Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

require 'webrick'
require 'json'

likes_and_changes = react_version = JSON.parse(File.read('./_likes_and_changes.json'))

puts 'Server started: http://localhost:3000/'

root = File.expand_path './build'
server = WEBrick::HTTPServer.new :Port => 3000, :DocumentRoot => root

server.mount_proc '/likes_and_changes.json' do |req, res|
  if req.request_method == 'POST'
    # Assume it's well formed
    puts likes_and_changes
    puts req.query
    likes_and_changes << req.query
    File.write('./_likes_and_changes.json', likes_and_changes.to_json)
  end

  # always return json
  res['Content-Type'] = 'application/json'
  res.body = likes_and_changes.to_json
end

trap 'INT' do server.shutdown end

server.start
