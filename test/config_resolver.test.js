const os = require("os");
const path = require("path");
const { findConfig } = require("../src/config_resolver");

describe("findConfig", () => {
  const configName = ".a-dat.config.json";
  const fakeCwd = "/a/b/c/d";
  const fakeError = Promise.reject({ code: "ENOENT" });

  it("fails if no config is found", () => {
    const readFileMock = jest.fn().mockReturnValue(fakeError);
    const promise = findConfig(configName, readFileMock, fakeCwd);
    return expect(promise).rejects.toThrow("not found");
  });

  it("attempts to find config in the user's home dir, if not found when recursing", async () => {
    const readFileMock = jest.fn().mockReturnValue(fakeError);
    const promise = findConfig(configName, readFileMock, fakeCwd);
    await expect(promise).rejects.toThrow("not found");
    expect(readFileMock).toHaveBeenLastCalledWith(
      path.join(os.homedir(), configName)
    );
  });

  it("recurses from current working directory until config is found", async () => {
    const data = { msg: "Test" };
    const readFileMock = jest
      .fn()
      .mockReturnValue(Promise.resolve(Buffer.from(JSON.stringify(data))))
      .mockReturnValueOnce(fakeError)
      .mockReturnValueOnce(fakeError)
      .mockReturnValueOnce(fakeError);
    const promise = findConfig(configName, readFileMock, fakeCwd);
    await expect(promise).resolves.toEqual(data);
    expect(readFileMock.mock.calls).toEqual([
      ["/a/b/c/d/.a-dat.config.json"],
      ["/a/b/c/.a-dat.config.json"],
      ["/a/b/.a-dat.config.json"],
      ["/a/.a-dat.config.json"]
    ]);
  });
});
